import { Stack, Box } from '@chakra-ui/react';
import Filter from '../components/Filter';
import StatsCardsContainer from '../components/StatsCards';
import Meta from '../components/Meta';

export default function TransferViewer() {
  return (
    <>
      <Meta
        title="전북대 전학/전과 현황"
        description="전북대학교의 전학/전과 현황을 모바일 환경으로 제공합니다."
      />
      <Stack mt={2} direction="column" spacing={4} minH="800px">
        <Filter />
        <StatsCardsContainer />
        <Box h="50px" />
      </Stack>
    </>
  );
}