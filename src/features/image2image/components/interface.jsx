'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { callAI } from '../utils';
import { useToast } from '@/providers/toast-provider';
import Image from 'next/image';

export const Image2ImageForm = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const form = useForm({
    defaultValues: {
      prompt: '',
      image: undefined,
    },
  });

  const onSubmit = async (data) => {
    const file = data.image[0];
    const imageURL = URL.createObjectURL(file);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: data.prompt, image: imageURL },
    ]);
    form.reset();
    setLoading(true);

    try {
      const aiResponse = await callAI(data);
      console.log(aiResponse);
      if (aiResponse) {
        const aiMessage = {
          role: 'bot',
          content: aiResponse.message,
          image: aiResponse.image,
        };
        setMessages((prev) => [...prev, aiMessage]);
        addToast('Response generated successfully', 'success');
      } else {
        addToast('Failed to generate response', 'error');
        console.error('Failed to generate response');
      }
    } catch (error) {
      form.setError('prompt', {
        type: 'manual',
        message: error.message,
      });
      console.error(error);
      addToast('Failed to generate prompt', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className='flex flex-col gap-4'>
      <div className='flex-1 overflow-auto flex flex-col gap-4 max-h-[40vh]'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg w-max max-w-[80%] flex flex-col gap-4',
              {
                'ml-auto bg-blue-500 text-white': message.role === 'user',
                'bg-slate-700 text-slate-100': message.role !== 'user',
              }
            )}
          >
            {message.role === 'user' && message.image && (
              <Image
                src={message.image}
                alt='User uploaded image'
                className='rounded-lg w-full h-auto'
                width={200}
                height={200}
              />
            )}
            {message.role === 'bot' && message.image && (
              <Image
                src={`/images/${message.image.replace('/', '')}`}
                alt='AI generated image'
                className='rounded-lg w-full'
                width={200}
                height={200}
              />
            )}
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex items-center justify-start gap-4 flex-col md:flex-row'>
          <div className='flex flex-col gap-2'>
            <input
              type='file'
              accept='image/*'
              className='px-4 py-1 my-1 text-lg font-medium rounded-lg border border-slate-700 bg-slate-800'
              {...form.register('image', {
                required: 'An image is required',
                validate: {
                  fileSize: (files) => {
                    const file = files?.[0];
                    if (!file) return 'An image is required';
                    return (
                      file.size <= 2000000 ||
                      "The image's size must be less than 2MB"
                    );
                  },
                  fileType: (files) => {
                    const file = files?.[0];
                    if (!file) return 'An image is required';
                    return (
                      file.type.startsWith('image/') ||
                      'The file must be an image'
                    );
                  },
                },
              })}
            />
            {form.formState.errors.image && (
              <span className='text-red-500'>
                {form.formState.errors.image.message}
              </span>
            )}
          </div>
          <div className='flex-1 flex flex-col gap-2 w-full'>
            <input
              type='text'
              placeholder='Enter your prompt here'
              className='px-4 py-2 my-1 text-lg font-medium rounded-lg border border-slate-700 bg-slate-800'
              {...form.register('prompt', {
                minLength: {
                  value: 3,
                  message: 'Prompt must be at least 3 characters',
                },
                required: 'Prompt is required',
              })}
            />

            {form.formState.errors.prompt && (
              <span className='text-red-500'>
                {form.formState.errors.prompt.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type='submit'
          loading={loading}
          loadingText={'Generating'}
          className={'mt-8'}
        >
          Generate
        </Button>
      </form>
    </aside>
  );
};
