import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CompletedDeliveries = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: CompletedDeliveries = [] } = useQuery({

        queryKey: ['completeDParcelsDelivery', user?.email, 'parcel_delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`)
            return res.data;
        }


    })

    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost = 80;
        }
        else {
            return parcel.cost = 100;
        }
    }
    // console.log(CompletedDeliveries);
    return (
        <div>
            <h2 className="text-4xl">Completed Deliveries: {CompletedDeliveries.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CompletedDeliveries.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.senderDistrict}</td>
                            <td>{parcel.cost}</td>
                            <td>{calculatePayout(parcel)}</td>
                            <td>
                                <button

                                    className='btn btn-primary text-black'>Cash out</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;