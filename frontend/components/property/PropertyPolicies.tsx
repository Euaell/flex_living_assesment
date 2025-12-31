import { Clock, Ban, Shield, Calendar, CheckCircle2 } from "lucide-react";

export function PropertyPolicies() {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold font-serif text-flex-green mb-6">Stay Policies</h2>

            <div className="bg-[#F1F3EE] rounded-xl p-8 space-y-8">

                {/* Check-in & Check-out */}
                <div>
                    <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                        <Clock size={20} />
                        <h3>Check-in & Check-out</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <div className="text-gray-500 text-sm mb-1">Check-in Time</div>
                            <div className="text-gray-900 font-bold">3:00 PM</div>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <div className="text-gray-500 text-sm mb-1">Check-out Time</div>
                            <div className="text-gray-900 font-bold">10:00 AM</div>
                        </div>
                    </div>
                </div>

                {/* House Rules */}
                <div>
                    <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                        <Shield size={20} />
                        <h3>House Rules</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <Ban size={18} className="text-gray-500" />
                            <span className="text-gray-700 font-medium">No smoking</span>
                        </div>
                        <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <Ban size={18} className="text-gray-500" />
                            <span className="text-gray-700 font-medium">No pets</span>
                        </div>
                        <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <Ban size={18} className="text-gray-500" />
                            <span className="text-gray-700 font-medium">No parties or events</span>
                        </div>
                        <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <Shield size={18} className="text-gray-500" />
                            <span className="text-gray-700 font-medium">Security deposit required</span>
                        </div>
                    </div>
                </div>

                {/* Cancellation Policy */}
                <div>
                    <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                        <Calendar size={20} />
                        <h3>Cancellation Policy</h3>
                    </div>
                    <div className="space-y-4">
                        {/* Short Stays */}
                        <div className="bg-white rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-3 text-lg">For stays less than 28 days</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-gray-600 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-flex-green mt-1.5 shrink-0" />
                                    <span>Full refund up to 14 days before check-in</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-600 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-flex-green mt-1.5 shrink-0" />
                                    <span>No refund for bookings less than 14 days before check-in</span>
                                </li>
                            </ul>
                        </div>

                        {/* Long Stays */}
                        <div className="bg-white rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-3 text-lg">For stays of 28 days or more</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-gray-600 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-flex-green mt-1.5 shrink-0" />
                                    <span>Full refund up to 30 days before check-in</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-600 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-flex-green mt-1.5 shrink-0" />
                                    <span>No refund for bookings less than 30 days before check-in</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
