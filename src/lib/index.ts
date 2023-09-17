import CarbonAppConnectivity from '~icons/carbon/app-connectivity'
import CarbonApps from '~icons/carbon/apps'
import Carbon3dPrintMesh from '~icons/carbon/3d-print-mesh'
import CarbonBrushFreehand from '~icons/carbon/brush-freehand'
import CarbonAdd from '~icons/carbon/add'
import CarbonBinoculars from '~icons/carbon/binoculars'
import CarbonAgricultureAnalytics from '~icons/carbon/agriculture-analytics'

import type { ComponentType } from 'svelte';

export enum Settings {
    SITE_NAME = "AI Factory",
    SITE_SHORT_NAME = "AIF"
}

export interface Route {
    name: string;
    icon: ComponentType | string;
    path: string;
    nested_paths?: Route[];
};

export const routes: Route[] = [
    {
        name: "Dashboard",
        icon: CarbonApps,
        path: "/dashboard"
    },
    {
        name: "Factories",
        icon: CarbonAppConnectivity,
        path: "/factories",
        nested_paths: [
            {
                name: "Create",
                icon: CarbonAdd,
                path: "/factories/create"
            },
            {
                name: "View",
                icon: CarbonBinoculars,
                path: "/factories/view",
                nested_paths: [
                    {
                        name: "Active",
                        icon: "fa-check",
                        path: "/factories/view/active"
                    },
                    {
                        name: "Completed",
                        icon: "fa-check",
                        path: "/factories/view/completed"
                    
                    },
                    {
                        name: "All",
                        icon: "fa-check",
                        path: "/factories/view/all"
                    }
                ]
            },
        ]
    },
    {
        name: "Models",
        icon: Carbon3dPrintMesh,
        path: "/models",
        nested_paths: [
            {
                name: "Create",
                icon: CarbonAdd,
                path: "/models/create"
            },
            {
                name: "Train",
                icon: CarbonAgricultureAnalytics,
                path: "/models/train"
            },
            {
                name: "View",
                icon: CarbonBinoculars,
                path: "/models/view",
                nested_paths: [
                    {
                        name: "Recently Used",
                        icon: "fa-check",
                        path: "/models/view/recent"
                    },
                    {
                        name: "Favorites",
                        icon: "fa-check",
                        path: "/models/view/favorites"
                    
                    },
                    {
                        name: "All",
                        icon: "fa-check",
                        path: "/models/view/all"
                    }
                ]
            },
        ]

    },
    {
        name: "Prompts",
        icon: CarbonBrushFreehand,
        path: "/prompts",
        nested_paths: [
            {
                name: "Create",
                icon: CarbonAdd,
                path: "/prompts/create"
            },
            {
                name: "View",
                icon: CarbonBinoculars,
                path: "/prompts/view",
                nested_paths: [
                    {
                        name: "Recently Used",
                        icon: "fa-check",
                        path: "/prompts/view/recent"
                    },
                    {
                        name: "Favorites",
                        icon: "fa-check",
                        path: "/prompts/view/favorites"
                    
                    },
                    {
                        name: "All",
                        icon: "fa-check",
                        path: "/prompts/view/all"
                    }
                ]
            }
        ]
    }
]