"use client";

import { useState, useMemo } from "react";
import type { Room } from "@/lib/types";
import { RoomCard } from "./room-card";
import { Search, BedDouble, Users, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoomsDisplayProps {
  rooms: Room[];
}

export function RoomsDisplay({ rooms }: RoomsDisplayProps) {
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-9 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={bedType} onValueChange={setBedType}>
          <SelectTrigger className="h-11">
            <div className="flex items-center">
              <BedDouble className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Bed Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bed Types</SelectItem>
            {bedTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={capacity} onValueChange={setCapacity}>
          <SelectTrigger className="h-11">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Min Capacity" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Capacity</SelectItem>
            <SelectItem value="1">1+ Person</SelectItem>
            <SelectItem value="2">2+ People</SelectItem>
            <SelectItem value="3">3+ People</SelectItem>
            <SelectItem value="4">4+ People</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No rooms found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => {setSearchQuery(''); setBedType('all'); setCapacity('all');}}
            className="mt-4 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}