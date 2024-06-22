"use client";

import * as ort from "onnxruntime-web";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const mbtiTypes = [
  "EWHA",
  "EWGA",
  "EWHM",
  "EWGM",
  "ECHA",
  "ECGA",
  "ECHM",
  "ECGM",
  "SWHA",
  "SWGA",
  "SWHM",
  "SWGM",
  "SCHA",
  "SCGA",
  "SCHM",
  "SCGM",
];

const MbtiPredictor: React.FC = () => {
  const router = useRouter();
  const [prediction, setPrediction] = useState<string | null>(null);
  const [session, setSession] = useState<ort.InferenceSession | null>(null);

  useEffect(() => {
    const initOnnxSession = async () => {
      try {
        ort.env.wasm.wasmPaths = {
          "ort-wasm.wasm": "/onnxruntime/ort-wasm.wasm",
          "ort-wasm-simd.wasm": "/onnxruntime/ort-wasm-simd.wasm",
          "ort-wasm-threaded.wasm": "/onnxruntime/ort-wasm-threaded.wasm",
        };
        const newSession = await ort.InferenceSession.create(
          "/mbti_model.onnx"
        );
        setSession(newSession);
      } catch (e) {
        console.error("Failed to create ONNX session:", e);
      }
    };
    initOnnxSession();
  }, []);

  const loadAndPreprocessImage = (file: File): Promise<Float32Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 224;
          canvas.height = 224;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }
          ctx.drawImage(img, 0, 0, 224, 224);
          const imageData = ctx.getImageData(0, 0, 224, 224);
          const data = new Float32Array(3 * 224 * 224);
          for (let i = 0; i < imageData.data.length / 4; i++) {
            for (let c = 0; c < 3; c++) {
              data[i * 3 + c] =
                (imageData.data[i * 4 + c] / 255.0 - 0.485) / 0.229;
            }
          }
          resolve(data);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const runOnnxModel = async (preprocessedData: Float32Array) => {
    if (!session) {
      console.error("ONNX session not initialized");
      return;
    }

    const input = new ort.Tensor("float32", preprocessedData, [1, 3, 224, 224]);
    const feeds = { input: input };
    const results = await session.run(feeds);
    const output = results.output.data as Float32Array;
    const predictedIndex = Array.from(output).indexOf(Math.max(...output));
    setPrediction(mbtiTypes[predictedIndex]);
    return mbtiTypes[predictedIndex];
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const preprocessedData = await loadAndPreprocessImage(file);
        const res = await runOnnxModel(preprocessedData);
        router.push(res!);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  return (
    <div className=" w-[1440px] min-h-screen pt-[56px] flex flex-col items-center justify-between">
      <div className="relative self-stretch flex flex-row items-center justify-center gap-[60px] py-[50px] px-[200px] overflow-hidden">
        <div className="flex-1 h-[300px] flex flex-row items-start justify-start py-[4px] px-0 rounded-[35px] overflow-hidden mt-10">
          <div className="relative flex-1 self-stretch bg-[#49deff4d] rounded-[6px] cursor-pointer">
            <div className="absolute -translate-y-1/2 left-[16px] right-[16px] top-1/2 h-[50px] text-[12px] leading-[16px] font-['Roboto'] text-[#000] text-center flex flex-col justify-center items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[1440px] h-[1px] bg-[#0000001a] mb-7"></div>
        <div className="flex flex-col items-center justify-center gap-[30px]">
          <div className="w-[373px] text-[20px] leading-[28px] font-['Roboto'] text-[#000] text-center flex flex-col justify-center">
            © 2024 Forif Hackathon.
          </div>
          <div className="w-[150px] text-[15px] leading-[28px] font-['Roboto'] text-[#000] text-center flex flex-col justify-center mb-6">
            제작자: 권기태, 박재범, 정경욱, 김성아, 우지헌, 조혜원, 김동욱
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbtiPredictor;
