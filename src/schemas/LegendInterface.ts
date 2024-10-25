export interface iLegendData {
    [category: string]: {
        title: string
        colors: {
            index: string | number
            color: string
        }[]
    }
}