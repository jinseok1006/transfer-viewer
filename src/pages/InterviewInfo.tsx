import { Box, Heading, Button, Stack } from '@chakra-ui/react';
import { useSearchParams, Link } from 'react-router-dom';

import NotFound from './NotFound';

import InterviewPostCard, {
  InterviewPost,
} from '../components/InterviewPostCard';
import useAsync from '../hooks/useAsync';

import { fetchInterviewPost } from '../api/api';
import NoInterviewPost from '../components/NoInterviewPost';
import Head from '../components/Head';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useDivisionsStore } from '../store/transfer-statistics';

export default function InterviewInfoPage() {
  const divisions = useDivisionsStore((state) => state.divisions);
  const [searchParams] = useSearchParams();
  const division = searchParams.get('division');

  if (!division) return <NotFound />;

  if (!divisions.includes(division)) return <NotFound />;

  return (
    <>
      <Head title={division} />
      <InterviewInfoContainer division={division} />
      <InterviewWriteButton division={division} />
    </>
  );
}

function InterviewWriteButton({ division }: { division: string }) {
  return (
    <Box
      position='fixed'
      zIndex={10}
      bottom='10px'
      left='50%'
      width='90px'
      transform='translateX(-50%)'
    >
      <Button
        colorScheme='red'
        borderRadius='50px'
        width='100%'
        as={Link}
        to={`/interview/write-form?division=${division}`}
      >
        글쓰기
      </Button>
    </Box>
  );
}

function InterviewInfoContainer({ division }: { division: string }) {
  return (
    <>
      <Heading size='md' my={4}>
        {division}
      </Heading>
      <InterviewInfo division={division} />
    </>
  );
}

function InterviewInfo({ division: division }: { division: string }) {
  const [loading, error, interviewPosts] = useAsync<InterviewPost[]>(() =>
    fetchInterviewPost(division)
  );

  if (error) {
    return <Error error={error} />;
  }
  if (loading || !interviewPosts) {
    return <Loading />;
  }

  if (interviewPosts.length === 0) {
    return <NoInterviewPost />;
  }

  return (
    <>
      <Stack direction='column' spacing={5}>
        {interviewPosts.map(
          (
            { division, year, yearPrivacy, grade, score, takeLecture, body },
            i
          ) => (
            <InterviewPostCard
              key={i}
              division={division}
              yearPrivacy={yearPrivacy}
              year={year}
              grade={grade}
              score={score}
              takeLecture={takeLecture}
              body={body}
            />
          )
        )}
      </Stack>
    </>
  );
}
