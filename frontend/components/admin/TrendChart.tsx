import ReactECharts from 'echarts-for-react';
import { ReviewStats } from '@/types/review';
import { Card } from '@/components/ui/Card';

interface TrendChartProps {
    stats: ReviewStats | null;
}

export const TrendChart = ({ stats }: TrendChartProps) => {
    if (!stats) return null;

    // Transform rating distribution for chart
    const ratings = Object.entries(stats.by_rating).map(([rating, count]) => ({
        name: `${rating} Stars`,
        value: count
    }));

    const option = {
        title: {
            text: 'Rating Distribution',
            left: 'center',
            textStyle: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                fontFamily: 'Inter, sans-serif',
            }
        },
        series: [
            {
                name: 'Reviews',
                type: 'pie',
                radius: '70%',
                data: ratings,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                itemStyle: {
                    color: (params: any) => {
                        const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
                        // Map rating 1-5 to colors
                        const rating = parseInt(params.data.name);
                        return colors[rating - 1] || '#ccc';
                    }
                }
            }
        ]
    };

    return (
        <Card className="p-6 mb-8">
            <ReactECharts option={option} style={{ height: '300px' }} />
        </Card>
    );
};
