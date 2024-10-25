import { iElement } from "./ElementInterface";

export interface iAtomicElementProps {
    element: iElement;
    obscure: {
        periodHover: number;
        groupHover: number;
        elementHover: number;
        otherElementHighlighted: boolean;
    };
    colorIndex: string;
    hover: (elementHover: number) => void;
    click: (currentElement: iElement) => void;
}

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
}

export interface iPeriodLabelProps {
    data: { periodNumber: number };
    hover: (periodHover: number) => void;
}
