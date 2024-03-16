import type { SVGProps} from 'react'
export type urlDetails = {
    id: string,
    title: string,
    thumbnail: string,
    has_qr: boolean,
    short_url: string,
    original_url: string,
    created_at: string,
    updated_at: string
  }

export interface IconProps extends SVGProps<SVGSVGElement> {
	title?: string; 
}