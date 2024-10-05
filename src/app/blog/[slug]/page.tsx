import { FC } from 'react';
import Singlepostcom from '@/app/components/singlepostcom/single_post_com';

interface Params {
  slug: string;  // Change 'id' to 'slug'
}

interface PageProps {
  params: Params;
}

const Page: FC<PageProps> = ({ params }) => {
  return (
    <Singlepostcom params={params} />
  );
}

export default Page;
