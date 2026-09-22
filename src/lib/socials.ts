import type { IconType } from 'react-icons'
import { FaLinkedin } from 'react-icons/fa'
import { SiFacebook, SiGithub, SiInstagram } from 'react-icons/si'

export interface SocialLink {
	name: string
	href: string
	icon: IconType
	color: string
}

export const SOCIAL_LINKS: SocialLink[] = [
	{
		name: 'Facebook',
		href: 'https://www.facebook.com/coderyandev/',
		icon: SiFacebook,
		color: '#1877F2',
	},
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/coderyandev/',
		icon: SiInstagram,
		color: '#E4405F',
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/coderyandev/',
		icon: FaLinkedin,
		color: '#0A66C2',
	},
	{
		name: 'GitHub',
		href: 'https://github.com/ryan-santiago',
		icon: SiGithub,
		color: '#181717',
	},
]
