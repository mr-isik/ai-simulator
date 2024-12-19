'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { callAI } from '../utils';
import { useToast } from '@/providers/toast-provider';

export const Text2TextForm = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const form = useForm({
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (data) => {
    setMessages((prev) => [...prev, { role: 'user', content: data.prompt }]);
    form.reset();
    setLoading(true);

    try {
      const aiResponse = await callAI(data.prompt);
      if (aiResponse) {
        const aiMessage = { role: 'bot', content: aiResponse };
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
            className={cn('p-4 rounded-lg max-w-[80%]', {
              'ml-auto bg-blue-500 text-white': message.role === 'user',
              'bg-slate-700 text-slate-100': message.role !== 'user',
            })}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
        <input
          type='text'
          placeholder='Enter your prompt here'
          className='px-4 py-2 my-1 text-lg font-medium rounded-lg border border-slate-700 bg-slate-800'
          {...form.register('prompt', {
            minLength: {
              value: 3,
              message: 'This field must be at least 3 characters',
            },
            required: 'This field is required',
          })}
        />
        <span className='text-red-500'>
          {form.formState.errors.prompt?.message}
        </span>
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
