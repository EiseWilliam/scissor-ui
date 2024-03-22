import type { SVGProps } from "react";
export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;

export type Heroicon = React.FC<IconProps>;

export type urlDetails = {
	id: string;
	title: string;
	thumbnail: string;
	has_qr: boolean;
	short_url: string;
	original_url: string;
	created_at: string;
	updated_at: string;
};

export interface IconProps extends SVGProps<SVGSVGElement> {
	title?: string;
}