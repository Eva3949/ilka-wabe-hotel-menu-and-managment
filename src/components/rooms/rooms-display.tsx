"use client";

import { useState, useMemo } from "react";
import type { Room } from "@/lib/types";
import { RoomCard } from "./room-card";
import { Search, BedDouble, Users, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-context";

interface RoomsDisplayProps {
  rooms: Room[];
}

export function RoomsDisplay({ rooms }: RoomsDisplayProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [bedType, setBedType] = useState('all');
  const [capacity, setCapacity] = useState('all');

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBed = bedType === 'all' || room.bedType.toLowerCase() === bedType.toLowerCase();
      const matchesCapacity = capacity === 'all' || room.capacity >= parseInt(capacity);
      
      return matchesSearch && matchesBed && matchesCapacity;
    });
  }, [rooms, searchQuery, bedType, capacity]);

  const bedTypes = Array.from(new Set(rooms.map(r => r.bedType)));

  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
          {t('rooms.title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('rooms.description')}
        </p>
      </div>

      <div className="bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-border/50 shadow-xl max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5 space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
              {t('rooms.searchLabel')}
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder={t('rooms.searchPlaceholder')}
                className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
              {t('rooms.bedTypeLabel')}
            </label>
            <Select value={bedType} onValueChange={setBedType}>
              <SelectTrigger className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-primary" />
                  <SelectValue placeholder={t('rooms.allBeds')} />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">{t('rooms.allBeds')}</SelectItem>
                {bedTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
              {t('rooms.capacityLabel')}
            </label>
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <SelectValue placeholder={t('rooms.anyCapacity')} />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">{t('rooms.anyGuests')}</SelectItem>
                <SelectItem value="1">1 {t('rooms.anyGuests').includes('እንግዳ') ? 'እንግዳ' : 'Guest'}</SelectItem>
                <SelectItem value="2">2 {t('rooms.anyGuests').includes('እንግዳ') ? 'እንግዳ' : 'Guests'}</SelectItem>
                <SelectItem value="3">3+ {t('rooms.anyGuests').includes('እንግዳ') ? 'እንግዳ' : 'Guests'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-14 w-full rounded-2xl border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
              onClick={() => {
                setSearchQuery('');
                setBedType('all');
                setCapacity('all');
              }}
            >
              <Search className="h-5 w-5 rotate-45" />
            </Button>
          </div>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted/30 p-8 rounded-full mb-6">
              <Search className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-2">
              {t('rooms.noRoomsFound')}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}