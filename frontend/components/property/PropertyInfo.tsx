import { Button } from "@/components/ui/Button";

export function PropertyInfo() {
    return (
        <div className="p-8 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8 border border-gray-100">
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-4">About this property</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-4">
                <p>
                    This 2-bedroom property in Fulham is perfect for families or groups, accommodating up to 5 people.
                    The first bedroom has a king-size bed for two, while the second has a double bed for two. There's
                    also an extra single bed in the living room. With two bathrooms, a fully equipped kitchen, a balcony...
                </p>
            </div>
            <Button variant="ghost" className="text-flex-green font-medium hover:bg-transparent p-0 h-auto">
                Read more
            </Button>
        </div>
    );
}
