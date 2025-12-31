import ReactECharts from 'echarts-for-react';
import { ReviewStats } from '@/types/review';
import { Card } from '@/components/ui/Card';
import { CHANNEL_MAP } from '@/types/review';

interface VisibilityByChannelChartProps {
    stats: ReviewStats | null;
}

export const VisibilityByChannelChart = ({ stats }: VisibilityByChannelChartProps) => {
    if (!stats) return null;

    // Prepare data for the visibility chart
    const channels = Object.keys(stats.visibility_by_channel);
    const channelNames = channels.map(id => CHANNEL_MAP[parseInt(id)]?.label || `Channel ${id}`);
    const visibleCounts = channels.map(id => stats.visibility_by_channel[id].visible || 0);
    const hiddenCounts = channels.map(id => stats.visibility_by_channel[id].hidden || 0);

    const option = {
        title: {
            text: 'Visibility by Channel',
            left: 'center',
            textStyle: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params: any) => {
                const channelName = params[0].axisValue;
                const visible = params[0].value;
                const hidden = params[1].value;
                return `${channelName}<br/>Visible: ${visible}<br/>Hidden: ${hidden}`;
            }
        },
        legend: {
            data: ['Visible', 'Hidden'],
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
        xAxis: {
            type: 'category',
            data: channelNames,
            axisLabel: {
                fontFamily: 'Inter, sans-serif',
                rotate: 20
            }
        },
        yAxis: {
            type: 'value',
            name: 'Count',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        series: [
            {
                name: 'Visible',
                type: 'bar',
                stack: 'total',
                data: visibleCounts,
                itemStyle: {
                    color: '#22c55e' // green-500
                }
            },
            {
                name: 'Hidden',
                type: 'bar',
                stack: 'total',
                data: hiddenCounts,
                itemStyle: {
                    color: '#ef4444' // red-500
                }
            }
        ]
    };

    return (
        <Card className="p-6">
            <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
        </Card>
    );
};