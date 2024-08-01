import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem
} from "@nextui-org/react";
import {supabase} from "../lib/helper/supabaseClient.js";
import {FaFilter} from "react-icons/fa6";

const FilterModal = ({
                         genre,
                         setGenre,
                         format,
                         setFormat,
                         onApplyFilters,
                         onClearFilters,
                     }) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [deferredGenre, setDeferredGenre] = useState(genre);
    const [deferredFormat, setDeferredFormat] = useState(format);

    useEffect(() => {
        if (showFilterModal) {
            fetchGenresAndFormats();
        }
    }, [showFilterModal, genre, format]);

    const fetchGenresAndFormats = () => {
        supabase
            .from('album_genre')
            .select('*')
            .then(({data, error}) => {
                if (error) {
                    throw error;
                }
                setGenres(data);
            })
            .catch((error) => {
                console.error(error);
            });

        supabase
            .from('album_format')
            .select('*')
            .then(({data, error}) => {
                if (error) {
                    throw error;
                }
                setFormats(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleApplyFilters = () => {
        // setGenre(deferredGenre);
        // setFormat(deferredFormat);
        onApplyFilters(genre, format);
        setShowFilterModal(false);
    };

    const handleClearFilters = () => {
        onClearFilters();
        setShowFilterModal(false);
    }

    return (
        <>
            <Button size="sm" variant="bordered" onClick={() => setShowFilterModal(true)}>
                <FaFilter/>
            </Button>
            {showFilterModal && (
                <Modal portalContainer={document.getElementById('modal')} onClose={() => setShowFilterModal(false)}
                       isOpen={showFilterModal}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Filter Albums</ModalHeader>
                                <ModalBody>
                                    <Select
                                        aria-label="filter genre select"
                                        placeholder="Select Genre"
                                        value={genre}
                                        defaultSelectedKeys={[genre]}
                                        onChange={(e) => setGenre(e.target.value)}
                                        classNames={{base: 'mb-4'}}
                                    >
                                        {genres.map((g) => (
                                            <SelectItem key={g.name} value={g.name}>{g.name}</SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        aria-label="filter format select"
                                        placeholder="Select Format"
                                        value={format}
                                        defaultSelectedKeys={[format]}
                                        onChange={(e) => setFormat(e.target.value)}
                                        classNames={{base: 'mb-4'}}
                                    >
                                        {formats.map((f) => (
                                            <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button auto onPress={() => {
                                        handleApplyFilters();
                                        onClose();
                                    }}>
                                        Apply
                                    </Button>
                                    <Button color="danger" onPress={() => {
                                        handleClearFilters();
                                        onClose();
                                    }}>Clear</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default FilterModal;
