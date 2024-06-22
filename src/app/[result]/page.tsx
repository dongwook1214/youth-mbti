"use client";

import { useState, EventHandler, ReactNode, useRef } from "react";
import { useParams } from "next/navigation";

const Result_EWHA = () => {
  const personalityTypes: { [id: string]: string[] } = {
    EWHA: [
      "활기찬 트렌드메이커",
      "밝고 따뜻한 성격으로 언제나 주목받는 사람이에요. 최신 유행을 선도하며, 주변 사람들에게 긍정적인 영향을 주고 모두를 끌어들이는 매력을 가지고 있어요. 항상 웃음을 잃지 않으며, 사람들에게 긍정적인 에너지를 전달해요. 새로운 것을 시도하는 것을 두려워하지 않으며, 언제나 앞서가려는 욕구가 강해요.",
    ],

    ECHA: [
      "쿨한 힙스터",
      "활기차면서도 쿨한 매력을 지닌 사람이에요. 유행을 잘 따라가고 자신의 스타일을 중요시하며, 독특한 패션 감각으로 주목받아요. 사람들과 어울리는 것을 좋아하지만, 지나치게 친근하지는 않아요. 자신만의 스타일과 의견을 확고히 가지며, 그로 인해 독립적이고 자신감 있는 모습을 보여줘요.",
    ],

    EWHM: [
      "따뜻한 리더",
      "리더십이 뛰어나며 사람들을 잘 이끄는 성격이에요. 따뜻한 성격으로 팀을 하나로 묶는 힘이 있으며, 모두에게 믿음직한 존재예요. 항상 타인의 의견을 경청하고 존중하며, 문제를 해결하는 데 있어 뛰어난 능력을 발휘해요. 사람들에게 동기를 부여하고, 목표를 향해 나아가도록 이끌어요.",
    ],

    ECHM: [
      "시크한 트렌드세터",
      "세련되고 차가운 매력으로 사람들을 끌어들이는 타입이에요. 고유의 스타일과 패션 감각이 뛰어나며, 언제나 앞서가는 느낌을 줘요. 다른 사람들에게 쉽게 영향받지 않으며, 자신만의 길을 가는 것을 중요시해요. 논리적이고 분석적인 사고를 통해 문제를 해결하며, 타인의 감정을 잘 다루는 능력이 있어요.",
    ],

    SWHA: [
      "포근한 힐러",
      "부드럽고 따뜻한 성격으로 사람들에게 안정감을 주는 사람이에요. 트렌디한 면모를 지니고 있으며 귀여운 매력으로 주변을 감싸줘요. 사람들의 감정을 잘 이해하고, 그들을 도울 준비가 항상 되어 있어요. 주변 사람들에게 긍정적인 영향을 미치며, 그들의 기분을 좋게 만드는 힘이 있어요.",
    ],

    SCHA: [
      "모던 아티스트",
      "조용하면서도 개성 넘치는 스타일을 가진 사람이에요. 차분하지만 그 속에 힙한 매력을 지니고 있으며, 독특한 감각으로 사람들의 이목을 끌어요. 예술적인 감각이 뛰어나며, 독창적인 아이디어를 자주 떠올려요. 혼자만의 시간을 소중히 여기며, 자신의 내면을 탐구하는 것을 즐겨요.",
    ],

    SWHM: [
      "부드러운 전략가",
      "따뜻하면서도 성숙한 면모를 가진 사람이에요. 차분하지만 전략적으로 사람들을 이끌어가며, 모두에게 신뢰를 주는 존재예요. 복잡한 상황에서도 냉정을 잃지 않으며, 항상 최선의 결정을 내리기 위해 노력해요. 다른 사람들의 의견을 잘 경청하고, 그들의 생각을 존중하는 자세를 지니고 있어요.",
    ],

    SCHM: [
      "쿨한 사색가",
      "차분하고 깊이 있는 스타일로 차가운 매력과 성숙함을 겸비한 사람이에요. 신중하고 세련된 매력을 지니고 있어요. 항상 모든 가능성을 고려하며, 결정을 내리기 전에 철저히 분석해요. 자기 관리를 중요시하며, 타인에게도 높은 기준을 적용해요.",
    ],
    EWGA: [
      "상냥한 외교관",
      "활기차고 따뜻한 성격으로 사람들과 쉽게 어울리며, 우아한 매력으로 주변을 사로잡는 사람이에요. 부드럽고 친근한 태도로 사람들을 이끄는 힘이 있어요. 타인과의 관계를 중요시하며, 갈등 상황에서도 원만하게 해결하려는 성향을 지니고 있어요. 항상 긍정적인 마인드를 유지하며, 주변 사람들에게 희망과 용기를 줘요.",
    ],

    ECGA: [
      "엘리트 인플루언서",
      "활기차면서도 차가운 매력을 지닌 사람이에요. 우아한 스타일로 사람들에게 영향력을 미치며, 고급스러운 분위기로 주목받아요. 목표를 향해 끊임없이 노력하며, 그 과정에서 타인의 의견을 경청하지 않을 때도 있어요. 자신의 스타일과 기준을 철저히 지키며, 그로 인해 사람들에게 강한 인상을 남겨요.",
    ],

    EWGM: [
      "카리스마 리더",
      "따뜻하고 활기찬 성격으로 사람들을 이끌며, 우아함과 성숙함으로 존경을 받는 사람이에요. 뛰어난 리더십으로 모두를 하나로 묶어요. 사람들의 감정을 잘 이해하고, 그들이 필요로 하는 것을 제공해주는 능력이 있어요. 항상 긍정적인 자세로 어려운 상황에서도 희망을 잃지 않아요.",
    ],

    ECGM: [
      "세련된 주도자",
      "세련되고 차가운 매력으로 사람들을 주도하는 타입이에요. 성숙한 판단력으로 상황을 잘 이끌어가며, 고급스러운 분위기로 신뢰를 줘요. 논리적이고 분석적인 사고를 통해 문제를 해결하며, 타인의 감정을 잘 다루는 능력이 있어요. 자신만의 스타일과 의견을 확고히 가지며, 그로 인해 독립적이고 자신감 있는 모습을 보여줘요.",
    ],

    SWGA: [
      "따뜻한 조언자",
      "부드럽고 따뜻한 성격으로 사람들에게 조언을 아끼지 않으며, 우아한 매력으로 신뢰를 받는 사람이에요. 모든 이에게 편안함을 주어요. 사람들의 이야기를 잘 들어주며, 그들이 필요로 하는 도움을 제공하려는 마음가짐을 가지고 있어요. 항상 차분하게 상황을 바라보며, 문제를 해결하는 데 있어 뛰어난 능력을 발휘해요.",
    ],

    SCGA: [
      "고요한 감상가",
      "차분하면서도 차가운 매력을 가진 사람이에요. 우아한 감각으로 상황을 신중하게 바라보며, 독특한 시각을 지니고 있어요. 혼자만의 시간을 소중히 여기며, 자신의 내면을 탐구하는 것을 즐겨요. 예술적인 감각이 뛰어나며, 독창적인 아이디어를 자주 떠올려요.",
    ],

    SWGM: [
      "현명한 중재자",
      "따뜻하고 성숙한 성격으로 갈등을 중재하며, 우아한 면모로 신뢰를 받는 사람이에요. 뛰어난 중재 능력으로 모두에게 평화를 가져다줘요. 복잡한 상황에서도 냉정을 잃지 않으며, 항상 최선의 결정을 내리기 위해 노력해요. 다른 사람들의 의견을 잘 경청하고, 그들의 생각을 존중하는 자세를 지니고 있어요.",
    ],

    SCGM: [
      "차분한 철학자",
      "차분하고 차가운 성격으로 깊이 있는 성찰을 하며, 우아한 태도로 사람들에게 인사이트를 제공하는 사람이에요. 모든 상황을 지혜롭게 해결해요. 항상 모든 가능성을 고려하며, 결정을 내리기 전에 철저히 분석해요. 자기 관리를 중요시하며, 타인에게도 높은 기준을 적용해요.",
    ],
  };

  const params = useParams();
  const result = useRef(params["result"]);
  console.log(params["result"]);

  return (
    <div className=" w-[1440px] min-h-screen flex flex-col items-center justify-start pt-[80px] bg-[#fff] justify-between">
      <div className=" relative self-stretch flex flex-row items-center justify-center gap-[60px] py-[60px] px-[170px] overflow-hidden">
        <div className="relative w-[1440px] shrink-0 flex flex-col items-center justify-center gap-[60px] py-[60px] px-[170px] overflow-hidden">
          <div className="self-stretch flex flex-row items-center justify-center gap-[60px]">
            <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch text-[40px] leading-[48px] font-['Roboto'] font-bold text-[#000]">
                당신의 청춘 MBTI 유형은?
              </div>
              <div className="self-stretch leading-[24px]">
                <span className="text-[25px] font-['Roboto'] font-bold text-[#4dcdea]">
                  {personalityTypes[result.current.toLocaleString()][0]}
                  <br />
                </span>
                <span className="text-[25px] font-['Roboto'] font-bold text-[#000]">
                  <br />
                </span>
                {result.current.toLocaleString()}
                <span className="text-[16px] font-['Roboto'] text-[#000]">
                  <br />
                  <br />
                  <br />
                  {personalityTypes[result.current.toLocaleString()][1]}
                </span>
              </div>
            </div>
            {/* <div className="w-[180px] h-[180px] shrink-0 flex flex-row items-start justify-start rounded-[35px] overflow-hidden">
              <div className="flex-1 self-stretch bg-[#d9d9d980]"></div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[1440px] h-[1px] bg-[#0000001a] mb-7"></div>
        <div className="flex flex-col items-center justify-center gap-[60px]">
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

export default Result_EWHA;
