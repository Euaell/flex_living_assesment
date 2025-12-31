import ReactECharts from 'echarts-for-react';
import { ReviewStats } from '@/types/review';
import { Card } from '@/components/ui/Card';

interface MonthlyTrendChartProps {
    stats: ReviewStats | null;
}

export const MonthlyTrendChart = ({ stats }: MonthlyTrendChartProps) => {
    if (!stats) return null;

    // Prepare data for the chart
    const months = Object.keys(stats.by_month).sort();
    const reviewCounts = months.map(month => stats.by_month[month]);

    const option = {
        title: {
            text: 'Reviews Over Time',
            left: 'center',
            textStyle: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const data = params[0];
                return `${data.axisValue}: ${data.value} reviews`;
            }
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLabel: {
                fontFamily: 'Inter, sans-serif',
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: 'Number of Reviews',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        series: [
            {
                data: reviewCounts,
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#3b82f6' // blue-500
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(59, 130, 246, 0.3)' // blue-500 with opacity
                            },
                            {
                                offset: 1,
                                color: 'rgba(59, 130, 246, 0.05)' // blue-500 with low opacity
                            }
                        ]
                    }
                }
            }
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '12%',
            containLabel: true
        }
    };

    return (
        <Card className="p-6 h-full">
            <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
        </Card>
    );
};