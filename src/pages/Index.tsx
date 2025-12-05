import { useState } from 'react';
import AIAssistant from '@/components/AIAssistant';
import StudentDashboard from '@/components/StudentDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-float">❄️</div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Арктика</h1>
                <p className="text-blue-100 text-sm">Образовательная платформа</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-semibold">Алексей Иванов</p>
                <p className="text-xs text-blue-200">Уровень 3 • Исследователь</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-white">
                А
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white shadow-md h-14 p-1 mb-8">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold text-base flex items-center gap-2"
            >
              <Icon name="LayoutDashboard" size={20} />
              Прогресс
            </TabsTrigger>
            <TabsTrigger 
              value="assistant" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold text-base flex items-center gap-2"
            >
              <Icon name="Bot" size={20} />
              ИИ-Помощник
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <StudentDashboard />
          </TabsContent>

          <TabsContent value="assistant" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <AIAssistant />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-blue-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 Арктика • Образовательная платформа для школьников
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">О проекте</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Помощь</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
