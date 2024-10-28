import { iElement } from "./ElementInterface";

export interface iAtomicElementProps {
    element: iElement;
    obscure: obscure;
    colorIndex: string;
    hover: (elementHover: number) => void;
    click: (currentElement: iElement) => void;
}

export interface iLanthAndActinProps {
    obscure: obscure;
    colorIndex: string;
    hover: (isLanth: boolean) => void;
}

export interface obscure {
    periodHover: number;
    groupHover: number;
    elementHover?: number;
    categoryHover: string;
    lanthHover: boolean;
    actinHover: boolean;
    otherElementHighlighted: boolean;
};

export interface iGroupData { groupNumber: number; title: string; yposition: number };

export interface iGroupLabelProps {
    data: {
        title: string;
        groupNumber: number;
        yposition: number;
    };
    hover: (groupHover: number) => void;
}

export interface iHeaderProps {
    colorIndex: string;
    select: (colorIndex: string) => void;
    aboutButtonClick: () => void;
}

export interface iPeriodLabelProps {
    data: { periodNumber: number };
    hover: (periodHover: number) => void;
}

export interface iLegendProps {
    colorIndex: string;
    hover: (categoryHover: string) => void;
}
