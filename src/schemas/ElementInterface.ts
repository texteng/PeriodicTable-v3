export interface iElement {
    number: number;
    name: string;
    symbol: string;
    atomic_mass: number;
    category: string;
    group_block: string;
    appearance?: string | null;
    element_color?: string | null;
    density?: number | null;
    boil?: number | null;
    melt?: number | null;
    molar_heat: number | null;
    period: number;
    group?: number | null;
    phase: string;
    summary: string;
    electron_affinity?: number | null;
    electronegativity: number | null;
    electron_configuration: string;
    atomic_radius?: number | null;
    ion_radius?: number | string | null;
    van_der_waals_radius?: number | null;
    ionization_energy?: number | null;
    bonding_type?: string | null;
    discovered_by?: string | null;
    year_discovered: string | number;
    named_by?: string | null;
    source: string;
    "cpk-hex"?: string | null;
    image: {
        title: string;
        url: string;
        attribution: string;
    };
    bohr_model_image: string;
    bohr_model_3d: string;
    spectral_image: string | null;
    block: string;
    xpos: number;
    ypos: number;
    wxpos: number;
    wypos: number;
    colors: {
        [k: string]: {
            hex: string;
            dark: boolean
        }
    }
};
