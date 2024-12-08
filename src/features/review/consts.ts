export interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
  image?: string
}

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    date: 'March 15, 2024',
    content:
      'Absolutely amazing experience! The attention to detail and quality of service exceeded all my expectations. Would highly recommend to anyone looking for excellence.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '2',
    author: 'Michael Chen',
    rating: 4,
    date: 'March 14, 2024',
    content:
      'Great service overall. The team was professional and responsive. Only minor suggestion would be to improve the response time slightly.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    rating: 5,
    date: 'March 13, 2024',
    content:
      'Outstanding service from start to finish. The team went above and beyond to ensure everything was perfect. Will definitely be coming back!',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '4',
    author: 'David Kim',
    rating: 5,
    date: 'March 12, 2024',
    content:
      'Incredible attention to detail and customer service. The team made sure everything was exactly as requested. Highly recommended!',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '5',
    author: 'Lisa Thompson',
    rating: 4,
    date: 'March 11, 2024',
    content:
      'Very satisfied with the service. Professional, efficient, and friendly staff. Would use again.',
  },
  {
    id: '6',
    author: 'James Wilson',
    rating: 5,
    date: 'March 10, 2024',
    content:
      'Exceptional service! The team was knowledgeable, professional, and went the extra mile to ensure satisfaction.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
]
