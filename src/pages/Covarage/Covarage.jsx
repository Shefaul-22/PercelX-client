import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Covarage = () => {

    const position = [23.6850, 90.3563]

    const serviceCenterData = useLoaderData();
    // console.log(serviceCenterData);


    const getInitialZoom = () => {
        if (window.innerWidth >= 1024) return 8; // Desktop
        if (window.innerWidth >= 640) return 8;  // Tablet
        return 7; // Mobile
    };

    const [zoomLevel, setZoomLevel] = useState(getInitialZoom());

    const mapRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setZoomLevel(8);
            } else {
                setZoomLevel(7);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleSearch = e => {
        e.preventDefault();

        const location = e.target.location.value;
        const district = serviceCenterData.find(c => c.district.toLowerCase().includes(location.toLowerCase()))

        if(district) {
            const coordinate = [district.latitude, district.longitude];
            // console.log(coordinate,district);
            mapRef.current.flyTo(coordinate, 14)
        }
    }

    return (
        <div>
            <h2 className='text-center font-bold my-12 text-2xl md:text-3xl'>We are available in 64 districts</h2>

            {/* search */}
            <div className='mb-6'>

                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow" name='location' placeholder="Search" />
                        <button className='cursor-pointer py-2 rounded-md px-3 bg-gray-200'>Search</button>
                    </label>

                </form>

            </div>

            <div className='border w-full h-[900px] md:h-[1200px]'>
                <MapContainer
                    center={position}

                    zoom={zoomLevel}
                    scrollWheelZoom={false}
                    className='h-[900px] md:h-[1200px]'
                    ref={mapRef}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenterData.map((center, index) => <Marker position={[center.latitude, center.longitude]} key={index}>

                            <Popup>
                                {center.district} <br /> Service Area: {center.covered_area.join(', ')}
                            </Popup>


                        </Marker>)
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Covarage;