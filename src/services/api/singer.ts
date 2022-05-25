import service from '../axios.ts';

type SingerCls = {
    type: number;
    area: number;
};

type Songs = {
    id: number;
    order: 'hot' | 'time';
    limit: number;
    offset: number;
};

const singerApi = {
    getSingerCls: '/artist/list',
    getSongs: '/artist/songs',
};

export function getSingerCls(params: SingerCls) {
    return service.get(singerApi.getSingerCls, {
        params,
    });
}

export function getSongs(params: Songs) {
    return service.get(singerApi.getSongs, {
        params,
    });
}
