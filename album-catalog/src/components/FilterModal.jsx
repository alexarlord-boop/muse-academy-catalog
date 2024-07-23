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

                     }) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);

    useEffect(() => {
        if (showFilterModal) {
            fetchGenresAndFormats();
        }
    }, [showFilterModal]);


    const fetchGenresAndFormats = () => {
        supabase
            .from('album_genre')
            .select('*')
            .then(({data, error}) => {
                if (error) {
                    throw error;
                }
                console.log(data);
                setGenres(data);
            })
            .catch((error) => {
                console.error(error);
            });

        supabase
            .from('album_format')
            .select('*')
            .then(({data: formatData, error: formatError}) => {
                if (formatError) {
                    throw formatError;
                }
                setFormats(formatData);
            })
            .catch((error) => {
                console.error(error);
            });

        console.log('Fetched all selectors data');
    };


    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <>
            <Button size="sm" variant="bordered" onClick={() => setShowFilterModal(true)}>
                <FaFilter/>
            </Button>
            {
                showFilterModal &&

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
                                        onChange={handleFilterChange(setGenre)}
                                        classNames={{
                                            base: 'mb-4',
                                        }}
                                    >
                                        {genres.map((g) => (
                                            <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        aria-label="filter format select"
                                        placeholder="Select Format"
                                        value={format}
                                        onChange={handleFilterChange(setFormat)}
                                        classNames={{
                                            base: 'mb-4',
                                        }}
                                    >
                                        {formats.map((f) => (
                                            <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button auto onPress={onClose}>
                                        Apply Filters
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>


            }
        </>
    );


};

export default FilterModal;
