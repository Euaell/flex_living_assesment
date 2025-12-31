import ReactECharts from 'echarts-for-react';
import { ReviewStats } from '@/types/review';
import { Card } from '@/components/ui/Card';
import { CHANNEL_MAP } from '@/types/review';

interface ChannelComparisonChartProps {
    stats: ReviewStats | null;
}

export const ChannelComparisonChart = ({ stats }: ChannelComparisonChartProps) => {
    if (!stats) return null;

    // Prepare data for the comparison chart
    const channels = Object.keys(stats.by_channel_rating);
    const channelNames = channels.map(id => CHANNEL_MAP[parseInt(id)]?.label || `Channel ${id}`);
    const avgRatings = channels.map(id => stats.by_channel_rating[id]);
    const reviewCounts = channels.map(id => stats.by_channel[parseInt(id)] || 0);

    const option = {
        title: [
            {
                text: 'Channel Performance Comparison',
                left: 'center',
                textStyle: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params: any) => {
                const channelName = params[0].axisValue;
                const rating = params[0].value;
                const count = params[1]?.value || 0;
                return `${channelName}<br/>Avg Rating: ${rating}<br/>Reviews: ${count}`;
            }
        },
        legend: {
            data: ['Average Rating', 'Review Count'],
            top: '10%',
            textStyle: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: channelNames,
                axisLabel: {
                    fontFamily: 'Inter, sans-serif',
                    rotate: 20
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Rating',
                min: 0,
                max: 5,
                position: 'left',
                axisLabel: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            {
                type: 'value',
                name: 'Count',
                position: 'right',
                axisLabel: {
                    fontFamily: 'Inter, sans-serif'
                }
            }
        ],
        series: [
            {
                name: 'Average Rating',
                type: 'bar',
                yAxisIndex: 0,
                data: avgRatings,
                itemStyle: {
                    color: '#10b981' // green-500
                }
            },
            {
                name: 'Review Count',
                type: 'bar',
                yAxisIndex: 1,
                data: reviewCounts,
                itemStyle: {
                    color: '#8b5cf6' // violet-500
                }
            }
        ]
    };

    return (
        <Card className="p-6 h-full">
            <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
        </Card>
    );
};