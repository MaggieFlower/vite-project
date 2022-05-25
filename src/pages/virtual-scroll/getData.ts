import { ref, unref } from 'vue';
import { getSingerCls, getSongs } from '@/services/api/singer.ts';

export type ArtistInfo = {
    id: number;
    singerName: string;
    picUrl: string;
};

const artistInfo = ref<ArtistInfo>({
    id: 0,
    singerName: '',
    picUrl: '',
});
async function getSingerId() {
    const res = await getSingerCls({
        type: 1,
        area: 7,
        limit: 1,
    });
    const artist = res.artists[0];
    ({
        id: artistInfo.value.id,
        name: artistInfo.value.singerName,
        picUrl: artistInfo.value.picUrl,
    } = artist);
}

async function getAllSongs(pageSize = 1) {
    const res = await getSongs({
        id: artistInfo.value.id,
        order: 'time',
        limit: 15,
        offset: pageSize,
    });
    const songs = res.songs.map((song: any, index: number) => ({
        name: song.name + index,
        ...artistInfo.value,
    }));
    return songs;
}

export { getSingerId, getAllSongs };
