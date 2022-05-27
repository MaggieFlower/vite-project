export type UnitType = {
    label: string;
    children?: Array<UnitType>;
    id?: string;
    show?: boolean;
};

export type DataType = Array<UnitType>;

export const sourceData: DataType = [
    {
        label: '一级',
        id: '1',
        children: [
            {
                label: '一级1-1',
                id: '1-1',
            },
            {
                label: '一级1-2',
                id: '1-2',
            },
            {
                label: '一级1-3',
                id: '1-3',

                children: [
                    {
                        label: '一级1-3-1',
                        id: '1-3-1',
                    },
                    {
                        label: '一级1-3-2',
                        id: '1-3-2',
                    },
                    {
                        label: '一级1-3-3',
                        id: '1-3-3',
                    },
                ],
            },
        ],
    },
    {
        label: '二级',
        id: '2',
        children: [
            {
                label: '二级1-1',
                id: '2-1',
            },
            {
                label: '二级1-2',
                id: '2-2',
            },
            {
                label: '二级1-3',
                id: '2-3',
                children: [
                    {
                        label: '二级1-3-1',
                        id: '2-3-1',
                    },
                    {
                        label: '二级1-3-2',
                        id: '2-3-2',
                    },
                    {
                        label: '二级1-3-3',
                        id: '2-3-3',
                    },
                ],
            },
        ],
    },
    {
        label: '三级',
        id: '3',
        children: [
            {
                label: '三级1-1',
                id: '3-1',
            },
            {
                label: '三级1-2',
                id: '3-2',
            },
            {
                label: '三级1-3',
                id: '3-3',
                children: [
                    {
                        label: '三级1-3-1',
                        id: '3-3-1',
                    },
                    {
                        label: '三级1-3-2',
                        id: '3-3-2',
                    },
                    {
                        label: '三级1-3-3',
                        id: '3-3-3',
                    },
                ],
            },
        ],
    },
];
