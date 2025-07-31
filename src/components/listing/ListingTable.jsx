import React, { useState } from 'react';
import { Search, Calendar, Filter, ChevronDown } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ListingStatusToggle from './ListingStatusToggle';
import ListingActions from './ListingActions';
import listImage from '../../assets/images/list-dj-img.png';

const ListingTable = ({ 
  searchTerm = '',
  categoryFilter = '',
  eventTypeFilter = '',
  statusFilter = '',
  dateFilter = ''
}) => {

  const [listings, setListings] = useState([
    {
      id: 1,
      image: listImage,
      title: 'DJ Abz Wine || DJ of the Year',
      description: 'With over 7 years of event experience, DJ Abz brings the perfect mix of energy and professionalism to make your event unforgettable.',
      category: 'Entertainment & Attractions',
      subcategory: 'DJ',
      pricing: '$75/day',
      securityFee: '$25',
      date: '2024-06-27',
      time: '10:00 AM',
      status: 'live',
      isLive: true
    },
    {
      id: 2,
      image: listImage,
      title: 'Professional Sound System',
      description: 'High-quality sound equipment perfect for events, parties, and corporate functions with crystal clear audio.',
      category: 'Music & Audio',
      subcategory: 'Sound Equipment',
      pricing: '$120/day',
      securityFee: '$50',
      date: '2024-06-28',
      time: '2:00 PM',
      status: 'block',
      isLive: false
    },
    {
      id: 3,
      image: listImage,
      title: 'LED Light Show Setup',
      description: 'Create an amazing atmosphere with our professional LED lighting setup, perfect for weddings and parties.',
      category: 'Decoration & Styling',
      subcategory: 'Lighting',
      pricing: '$95/day',
      securityFee: '$30',
      date: '2024-06-29',
      time: '6:00 PM',
      status: 'live',
      isLive: true
    },
    {
      id: 4,
      image: listImage,
      title: 'Wedding Photography Package',
      description: 'Capture your special moments with our professional photography services including pre-wedding shoots.',
      category: 'Photography & Video',
      subcategory: 'Wedding Photography',
      pricing: '$350/day',
      securityFee: '$0',
      date: '2024-06-30',
      time: '9:00 AM',
      status: 'live',
      isLive: true
    }
  ]);

  const handleStatusToggle = (id) => {
    setListings(prevListings =>
      prevListings.map(listing =>
        listing.id === id
          ? { ...listing, isLive: !listing.isLive, status: listing.isLive ? 'block' : 'live' }
          : listing
      )
    );
  };

  const handleEdit = (listing) => {
    console.log('Edit listing:', listing);
    // Open edit modal
  };

  const handleDelete = (listing) => {
    if (window.confirm(`Are you sure you want to delete "${listing.title}"?`)) {
      setListings(prevListings => prevListings.filter(l => l.id !== listing.id));
    }
  };

  const filteredListings = listings.filter(listing => {
    return (
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || listing.category === categoryFilter) &&
      (eventTypeFilter === '' || listing.subcategory === eventTypeFilter) &&
      (statusFilter === '' || listing.status === statusFilter) &&
      (dateFilter === '' || listing.date === dateFilter)
    );
  });

  return (
    <Card className="p-0 overflow-hidden">

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Image</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Title & Description</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Category</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Pricing</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Date & Time</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing, index) => (
              <tr key={listing.id} className={`border-t border-gray-100 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="py-4 px-6">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                  />
                </td>
                <td className="py-4 px-6 max-w-xs">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">{listing.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{listing.description}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900 font-medium">{listing.category}</p>
                    <Badge status="confirmed" className="text-xs">
                      {listing.subcategory}
                    </Badge>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{listing.pricing}</p>
                    {listing.securityFee !== '$0' && (
                      <p className="text-xs text-gray-500">Extra: {listing.securityFee} Security Fee</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                      {listing.date}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{listing.time}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <ListingStatusToggle
                    isLive={listing.isLive}
                    onToggle={handleStatusToggle}
                    id={listing.id}
                  />
                </td>
                <td className="py-4 px-6">
                  <ListingActions
                    listing={listing}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm truncate pr-2">{listing.title}</h4>
                  <div className="flex-shrink-0">
                    <ListingStatusToggle
                      isLive={listing.isLive}
                      onToggle={handleStatusToggle}
                      id={listing.id}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{listing.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge status="confirmed" className="text-xs">{listing.subcategory}</Badge>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="font-semibold text-sm text-gray-900">{listing.pricing}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
                      {listing.date}
                    </div>
                    <span>•</span>
                    <span>{listing.time}</span>
                  </div>
                  <ListingActions
                    listing={listing}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </Card>
  );
};

export default ListingTable;
