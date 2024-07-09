
import preview1 from './assets/card-preview-1.jpg';
import preview2 from './assets/card-preview-2.jpg';
import preview3 from './assets/card-preview-3.jpg';
import preview4 from './assets/card-preview-4.jpg';
import preview5 from './assets/card-preview-5.jpg';
import preview6 from './assets/card-preview-6.jpg';

const cards = [
	{
    id: 1,
		previewImageUrl: preview1,
		name: 'Безопасные химикаты',
		description: 'Вещества, которые могут причинить вред здоровью человека или окружающей среде  при неправильном использовании  или воздействии',
		publishDate: '13.07.2024',
	},
	{
    id: 2,
		previewImageUrl: preview2,
		name: 'Коллайдер',
		description: 'Прибор для ускорения  и столкновения заряженных частиц с целью изучения фундаментальных свойств материи',
		publishDate: '12.07.2024',
	},
	{
    id: 3,
		previewImageUrl: preview3,
		name: 'Точное оборудование',
		description: 'Позволяет получить точные результаты',
		publishDate: '10.07.2024',
	},
	{
    id: 4,
		previewImageUrl: preview4,
		name: 'Новая лаборатория',
		description: 'Все удобства “All inclusive”',
		publishDate: '8.07.2024',
	},
	{
    id: 5,
		previewImageUrl: preview5,
		name: 'Своевременная уборка',
		description: 'Соблюдение строгих протоколов утилизации отходов',
		publishDate: '7.07.2024',
	},
	{
    id: 6,
		previewImageUrl: preview6,
		name: 'Пушистые лаборанты',
		description: 'Помогают создавать уютную атмосферу в лаборатории',
		publishDate: '28.06.2024',
	},
];

export default function fetchCards () {
	return new Promise((resolve, reject) => setTimeout(() => resolve(cards), 2000));
}
