import React from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsContent,
  TabsList,
} from '@/components/ui/tabs';
import { Text2TextForm } from '@/features/text2text/components/interface';
import { Image2ImageForm } from '@/features/image2image/components/interface';

const Main = () => {
  return (
    <main className='w-full h-screen flex items-center justify-center flex-col p-10 gap-10'>
      <h1 className='text-3xl font-bold text-center'>
        Welcome to your Next.js AI app!
      </h1>
      <Tabs defaultValue={'text2text'}>
        <TabsList className={'my-8 grid grid-cols-2'}>
          <Tab value='text2text'>Text to Text</Tab>
          <Tab value={'text2image'}>Image to Image</Tab>
        </TabsList>
        <TabsContent>
          <TabPanel value='text2text'>
            <Text2TextForm />
          </TabPanel>
          <TabPanel value='text2image'>
            <Image2ImageForm />
          </TabPanel>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Main;
