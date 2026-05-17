import { useState, useMemo } from 'react';
import { Download, ExternalLink, MoreVertical } from 'lucide-react';
import { Modal, SearchInput, Button, Table, TableHeader, TableRow, TableCell, TableHead, Pagination } from '@/shared/ui';
import { formatDate } from '@/shared/lib/utils';
import type { Giveaway, Participant } from '@/entities/giveaway';
import { mockParticipantsByGiveaway } from '../lib/mockData';

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  giveaway: Giveaway | null;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const ParticipantsModal = ({ isOpen, onClose, giveaway }: ParticipantsModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const participants: Participant[] = useMemo(() => {
    if (!giveaway) return [];
    return mockParticipantsByGiveaway[giveaway.id] || [];
  }, [giveaway]);

  const filteredParticipants = useMemo(() => {
    if (!searchQuery) return participants;
    const query = searchQuery.toLowerCase();
    return participants.filter(p => 
      p.username.toLowerCase().includes(query) ||
      p.fullName?.toLowerCase().includes(query)
    );
  }, [participants, searchQuery]);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  
  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredParticipants.slice(start, start + itemsPerPage);
  }, [filteredParticipants, currentPage, itemsPerPage]);

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
  };

  if (!giveaway) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={
        <div className="flex items-center gap-3">
          <span>Участники розыгрыша</span>
          <span className="px-3 py-1 bg-violet-500/20 rounded-full text-sm text-violet-300">
            {participants.length} чел.
          </span>
        </div>
      }
      size="xl"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold text-white">{giveaway.title}</h3>
            <p className="text-sm text-gray-400">Призовой фонд: {giveaway.prizeAmount.toLocaleString()} ₽</p>
          </div>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download size={18} />
            Экспорт в CSV
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput 
              placeholder="Поиск по никнейму..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-violet-500/50"
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option} className="bg-gray-900">
                {option} на странице
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Никнейм</TableHead>
                <TableHead>Дата вступления</TableHead>
                <TableHead>Аккаунт</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {paginatedParticipants.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="text-gray-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
                        {participant.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">@{participant.username}</p>
                        {participant.fullName && (
                          <p className="text-xs text-gray-400">{participant.fullName}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {formatDate(participant.joinedAt)}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://t.me/${participant.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl text-cyan-400 text-sm transition-colors"
                    >
                      Перейти
                      <ExternalLink size={14} />
                    </a>
                  </TableCell>
                  <TableCell>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}

        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Участники не найдены</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
