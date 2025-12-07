import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Trophy, MapPin, Calendar, Filter } from 'lucide-react';
import { winners } from '../data/mock';

export const Winners = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const years = ['all', '2023', '2022', '2021'];
  const categories = ['all', 'Melhor Taxista', 'Melhor Mototaxista', 'Melhor Cooperativa', 'Inovação no Transporte'];

  const filteredWinners = winners.filter(winner => {
    const yearMatch = selectedYear === 'all' || winner.year.toString() === selectedYear;
    const categoryMatch = selectedCategory === 'all' || winner.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary-100 text-primary-700 hover:bg-primary-200">
              Hall da Fama
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Vencedores do 
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> PRENTMA</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Conheça os profissionais que se destacaram pela excelência e dedicação ao sector do transporte
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filtrar por:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Ano:</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === 'all' ? 'Todos os anos' : year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Categoria:</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas as categorias' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winners Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container mx-auto px-4">
          {filteredWinners.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum vencedor encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros para ver mais resultados</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWinners.map((winner) => (
                <Card key={winner.id} className="hover:shadow-2xl transition-all duration-300 border-0 bg-white group">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mb-6">
                      <img 
                        src={winner.photo} 
                        alt={winner.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {winner.name}
                    </CardTitle>
                    <Badge className="mb-4 bg-primary-100 text-primary-700">
                      {winner.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{winner.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{winner.location}</span>
                      </div>
                    </div>
                    <CardDescription className="text-gray-700 text-center italic">
                      "{winner.story}"
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Impacto dos Vencedores
            </h2>
            <p className="text-xl text-gray-600">
              O legado dos nossos premiados no sector do transporte
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Vencedores Premiados</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">18</h3>
              <p className="text-gray-600">Províncias Representadas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Edições Realizadas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Satisfação dos Clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Seja o Próximo Vencedor
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Candidate-se ao PRENTMA 2024 e junte-se ao hall da fama dos melhores profissionais do transporte
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Candidatar-se Agora
          </Button>
        </div>
      </section>
    </div>
  );
};