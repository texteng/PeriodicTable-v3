export interface iLegendCategory {
    title: string
    colors: {
        index: string | number;
        color: string;
        displayName: string; 
    }[]
};

export type iLegendData = Record<string, iLegendCategory>;;
