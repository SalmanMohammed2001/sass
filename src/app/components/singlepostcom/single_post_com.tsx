"use client";

import { getUserProfileById } from '@/app/lib/supabase/blog';
import React, { useEffect, useState } from 'react';
import styles from './singlePost.module.css';
import Image from 'next/image';
import LoadingCom from '../loadingcom/loading';

interface Params {
  params: {
    slug: string;
  };
}

interface UserProfile {
  image_url: string;
  title: string;
  description: string;
  created_at: string;
}

const Singlepostcom: React.FC<Params> = ({ params }) => {
  const { slug } = params;

  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfileById(slug); // No need for 'as string' if it's already typed
     
        setData(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <LoadingCom />
      </div>
    );
  }

  if (!data) {
    return <div>No user profile found.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`mt-[100px] p-2 shadow-md`}>
      <div className={styles.imgContainer}>
        <Image src={data.image_url} alt="image" className={styles.image} fill />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data.title}</h1>

        <div className={styles.details}>
          <div className={styles.detailsText}>
            <span className={styles.detailTile}>Published</span>
            <span className={styles.detailValue}>{formatDate(data.created_at)}</span>
          </div>
        </div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </div>
    </div>
  );
};

export default Singlepostcom;
