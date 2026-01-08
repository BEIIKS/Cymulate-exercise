import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { phishingService, type PhishingAttempt } from '../../services/api';
import { Send, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

export const PhishingSimulationPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAttempts = async () => {
        try {
            const data = await phishingService.getAttempts();
            setAttempts(data);
        } catch (error) {
            console.error('Failed to fetch attempts', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAttempts();
    }, []);

    const handleTrigger = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            await phishingService.triggerAttempt(email);
            setEmail('');
            await fetchAttempts();
        } catch (error) {
            console.error('Failed to trigger attempt', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status: PhishingAttempt['status']) => {
        const styles = {
            pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            success: 'bg-green-500/10 text-green-500 border-green-500/20',
            failed: 'bg-red-500/10 text-red-500 border-red-500/20',
        };

        const icons = {
            pending: <Clock className="w-3 h-3 mr-1" />,
            success: <CheckCircle className="w-3 h-3 mr-1" />,
            failed: <XCircle className="w-3 h-3 mr-1" />,
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
                {icons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Simulation Dashboard</h1>
                    <p className="text-slate-400">Manage and track phishing simulation campaigns</p>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                    onClick={fetchAttempts}
                >
                    Refresh Data
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title="Trigger Simulation" className="lg:col-span-1 h-fit">
                    <form onSubmit={handleTrigger} className="space-y-4">
                        <Input
                            label="Target Email"
                            type="email"
                            placeholder="target@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!email || isSubmitting}
                            isLoading={isSubmitting}
                            leftIcon={<Send className="w-4 h-4" />}
                        >
                            Send Phishing Email
                        </Button>
                        <p className="text-xs text-slate-500 mt-4 text-center">
                            This will send a simulated phishing email to the target address for training purposes.
                        </p>
                    </form>
                </Card>

                <Card title="Recent Attempts" className="lg:col-span-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-12 text-slate-500">
                            <RefreshCw className="w-6 h-6 animate-spin mr-3" />
                            Loading attempts...
                        </div>
                    ) : (
                        <Table
                            data={attempts}
                            keyExtractor={(item) => item._id}
                            columns={[
                                {
                                    header: 'Recipient',
                                    accessorKey: 'emailId',
                                    cell: (row) => <span className="font-medium text-slate-200">{row.emailId}</span>
                                },
                                {
                                    header: 'Status',
                                    accessorKey: 'status',
                                    cell: (row) => getStatusBadge(row.status)
                                },
                                {
                                    header: 'Sent At',
                                    accessorKey: 'createdAt',
                                    cell: (row) => new Date(row.createdAt).toLocaleDateString() + ' ' + new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                },
                            ]}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};
