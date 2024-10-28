export interface iLegendCategory {
    title: string
    colors: {
        index: string | number;
        color: string;
        displayName: string; 
    }[]
};

export interface iLegendData {
    [category: string]: iLegendCategory;
};
