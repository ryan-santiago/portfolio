import type { ExperienceEntry } from '@/types/experience'

export const experience: ExperienceEntry[] = [
	{
		id: 'questronix-corporation',
		company: 'Questronix Corporation',
		roles: [
			{
				title: 'Software Technical Team Lead',
				period: 'July 2023 — Present',
				highlights: [
					'Lead a 60+ member software team across multiple enterprise client engagements, overseeing delivery from planning and solution design through implementation and go-live.',
					'Drive end-to-end client engagement, covering requirements gathering, solution planning, project scoping, resource allocation, estimation, and delivery strategy.',
					'Provide technical and strategic leadership across projects, mentoring technical teams while driving R&D, emerging technologies, and continuous improvement initiatives.',
				],
			},
			{
				title: 'Technical Resource Manager',
				period: 'March 2022 - July 2023',
				highlights: [
					'Managed the technical resource pool, allocating developers across multiple client projects based on skills, project requirements, availability, and business priorities.',
					'Led resource planning and workforce development, including capacity forecasting, project staffing, technical training, and developer readiness for complex engagements.',
				],
			},
			{
				title: 'Fullstack Developer',
				period: 'March 2021 - March 2022',
				highlights: [
					'Developed and maintained full-stack web applications and RESTful APIs using React.js, Node.js, Express.js, and C#/.NET, including backend services, integrations, and database components.',
					'Contributed across the full software development lifecycle, from requirements analysis and technical design to development, testing, deployment, and production support.',
				],
			},
		],
	},
	{
		id: 'jeonsoft-corporation',
		company: 'Jeonsoft Corporation',
		roles: [
			{
				title: 'Software Developer',
				period: 'August 2018 — February 2021',
				highlights: [
					'Developed and maintained business-critical desktop applications using Delphi 7 and Microsoft SQL Server.',
					'Designed and developed full-stack web applications using the PERN stack — PostgreSQL, Express.js, React.js, and Node.js.',
					'Developed backend services, database components, and front-end features based on functional and technical requirements.',
					'Optimized SQL Server queries, database structures, and application logic to improve system performance and reliability.',
					'Contributed across the full software development lifecycle, from requirements gathering and system design through development, testing, deployment, and production support.',
				],
			},
		],
	},
]
