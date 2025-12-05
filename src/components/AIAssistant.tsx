import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Привет! Я твой ИИ-помощник по исследованию Арктики 🧊. Готов помочь тебе с любыми вопросами о миссиях, заданиях и арктической природе!',
    sender: 'ai',
    timestamp: new Date()
  }
];

const QUICK_QUESTIONS = [
  'Какая следующая миссия?',
  'Как спасти морских птиц?',
  'Что такое тепловая карта?',
  'Покажи мой прогресс'
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('миссия') || lowerQuestion.includes('задание')) {
      return 'Твоя следующая миссия — "Спасение морских птиц" 🐧! Тебе нужно измерить параметры воды и воздуха, построить миграционный маршрут и создать временное гнездо. За выполнение ты получишь 150 баллов опыта и значок "Защитник природы".';
    }
    
    if (lowerQuestion.includes('птиц') || lowerQuestion.includes('гнездо')) {
      return 'Для спасения морских птиц выполни 3 шага: 1) Собери данные о температуре воды (должна быть 2-4°C) 2) Построй маршрут миграции на карте 3) Используй доступные материалы для создания защищённого гнезда. Не забудь использовать температурный датчик!';
    }
    
    if (lowerQuestion.includes('карта') || lowerQuestion.includes('тепловая')) {
      return 'Тепловая карта — это визуализация температурных данных на карте 🗺️. Тёплые зоны показаны красным и оранжевым, холодные — синим и голубым. Она помогает определить безопасные зоны для животных и понять климатические изменения.';
    }
    
    if (lowerQuestion.includes('прогресс') || lowerQuestion.includes('статистика')) {
      return 'Отличные результаты! 📊 Ты уже на 3 уровне, выполнил 12 миссий из 45 и заработал 2840 баллов опыта. До следующего уровня осталось всего 160 баллов. Продолжай в том же духе!';
    }
    
    return 'Отличный вопрос! 🤔 Я всегда готов помочь тебе с исследованием Арктики. Попробуй спросить меня о конкретной миссии, задании или явлении природы, и я дам подробный ответ!';
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Card className="flex flex-col h-[600px] bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 p-4 border-b border-blue-200 bg-gradient-to-r from-blue-500 to-purple-500">
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarFallback className="bg-white text-blue-600 font-bold text-lg">🤖</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-bold text-white">ИИ-Помощник Арктики</h3>
          <p className="text-xs text-blue-100">Онлайн • Всегда готов помочь</p>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Icon name="Settings" size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-up ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                    🤖
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                    : 'bg-white border border-blue-200 text-gray-800'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-purple-200' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                  🤖
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border border-blue-200 rounded-2xl p-3 shadow-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-white hover:bg-blue-50 border-blue-300 text-blue-700 hover:border-blue-400 transition-all hover:scale-105"
            >
              {question}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Задай вопрос об Арктике..."
            className="flex-1 border-blue-300 focus:border-blue-500"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
