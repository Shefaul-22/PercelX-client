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

    const { data: payoutData = {} } = useQuery({
        queryKey: ['riderPayout', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider/payout?riderEmail=${user.email}`
            );
            return res.data;
        }
    });

    const totalPayout = payoutData.totalPayout || 0;

    // const calculatePayout = () => {
    //     if (parcel.senderDistrict === parcel.receiverDistrict) {
    //         return parcel.cost = 60;
    //     }
    //     else {
    //         return parcel.cost = 100;
    //     }
    // }
    console.log(CompletedDeliveries);


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
                            

                            <td>
                                {
                                    parcel.senderDistrict===parcel.receiverDistrict ? 60 : 80
                                }
                                </td>
                            <td>
                                <button

                                    className='btn btn-primary text-black'>Cash out</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
                <h3 className="text-2xl font-semibold text-green-600 my-2">
                    Total Payout: ৳{totalPayout}
                </h3>
            </div>
        </div>
    );
};

export default CompletedDeliveries;