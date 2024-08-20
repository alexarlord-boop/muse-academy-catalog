import {create} from 'zustand';

const useAlbumStore = create((set) => ({
    albumsNumber: 0,
    albumsPerPage: 10,
    filteredAlbums: [],
    searchTerm: '',
    genre: '',
    format: '',
    setAlbumsNumber: (count) => set({ albumsNumber: count }),
    setFilteredAlbums: (albums) => set({ filteredAlbums: albums }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setGenre: (genre) => set({ genre }),
    setFormat: (format) => set({ format }),
}));

export default useAlbumStore;