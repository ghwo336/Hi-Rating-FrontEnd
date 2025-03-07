import {useState, useEffect} from "react";
import styled from "styled-components";
import RankingContainerExplainBar from "../components/RankingContainerExplainBar";
import RankingEntity from "../components/RankingEntity";
import {fetchRankingData} from "../api/RanikingApi"; // ✅ API 모듈 가져오기

const Wrapper = styled.div`
  width: 673px;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 342px;
  }
`;

const RankingContiner = ({selected}: {selected: number}) => {
  const [rankingData, setRankingData] = useState<
    {
      num: number;
      handle: string;
      tier: number;
      event: boolean;
      today: number;
      total: number;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        const data = await fetchRankingData(selected); // ✅ API 모듈 사용
        setRankingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    loadRankingData();
  }, [selected]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <Wrapper>
      <RankingContainerExplainBar />
      {rankingData.map(({num, handle, tier, today, total, event}) => (
        <RankingEntity
          key={num}
          ranking={num}
          handle={handle}
          tier={tier}
          today={today}
          total={total}
          event={event}
        />
      ))}
    </Wrapper>
  );
};

export default RankingContiner;
