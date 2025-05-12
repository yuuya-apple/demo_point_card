import React, { useState } from "react";
import { Grid, Star, CupSoda, Award } from "lucide-react";

export default function PointCard() {
  const [stamps, setStamps] = useState(0);
  const [lastStampIndex, setLastStampIndex] = useState(null);
  const [isStamping, setIsStamping] = useState(false);

  const addStamp = () => {
    if (stamps < 10) {
      setIsStamping(true);
      setLastStampIndex(stamps);

      // スタンプアニメーションの後にスタンプ追加
      setTimeout(() => {
        setStamps((prevStamps) => Math.min(prevStamps + 1, 10));
        setIsStamping(false);
      }, 300);
    }
  };

  const rewards = [
    {
      id: 1,
      name: "フリードリンク",
      requiredStamps: 8,
      description: "バーで1杯無料",
    },
    {
      id: 2,
      name: "特別カクテル",
      requiredStamps: 5,
      description: "プレミアムカクテル割引",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-black z-10 p-4 flex justify-between items-center">
        <div className="text-2xl font-light tracking-widest">kisobar</div>
        <div className="text-white">
          <Grid />
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="pt-20 px-4">
        <h1 className="text-3xl font-light mb-6 tracking-wider">
          ポイントカード
        </h1>

        {/* スタンプエリア */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">スタンプ</span>
            <span className="text-lg">{stamps} / 10</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`h-10 rounded relative overflow-hidden 
                  ${index < stamps ? "bg-yellow-500" : "bg-gray-700"}`}
              >
                {lastStampIndex === index && isStamping && (
                  <div className="absolute inset-0 bg-yellow-500 opacity-50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* スタンプ追加ボタン */}
        <button
          onClick={addStamp}
          disabled={stamps >= 10 || isStamping}
          className="w-full bg-yellow-500 text-black py-4 rounded-lg hover:bg-yellow-600 mb-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isStamping ? "スタンプ押印中..." : "スタンプを追加"}
        </button>

        {/* 報酬セクション */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" /> 獲得可能な特典
          </h2>
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex justify-between items-center border-b border-gray-700 py-4"
            >
              <div>
                <div className="text-lg">{reward.name}</div>
                <div className="text-sm text-gray-400">
                  {reward.description}
                </div>
              </div>
              <div
                className={
                  stamps >= reward.requiredStamps
                    ? "text-yellow-500"
                    : "text-gray-500"
                }
              >
                {stamps >= reward.requiredStamps
                  ? "獲得可能"
                  : `あと${reward.requiredStamps - stamps}スタンプ`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フッター */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black p-4 flex justify-around">
        <button className="flex flex-col items-center">
          <Star className="mb-1" />
          <span className="text-xs">ポイント</span>
        </button>
        <button className="flex flex-col items-center">
          <CupSoda className="mb-1" />
          <span className="text-xs">メニュー</span>
        </button>
      </footer>
    </div>
  );
}
