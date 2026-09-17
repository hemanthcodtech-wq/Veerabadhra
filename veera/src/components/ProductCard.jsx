import React from 'react';
import { Heart, Play, Share2, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { useStoreData } from '../store/useStoreData';
import { useAuthStore } from '../store/useAuthStore';
import { QuantityModal } from './QuantityModal';

function parseList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function InstagramIcon({ className }) {
  return <Play className={className} aria-hidden="true" />;
}

export function ProductCard({ product, layout = 'grid', searchQuery = '' }) {
  const navigate = useNavigate();
  const { toggleWishlist, items: wishlistItems } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { offers } = useStoreData();
  const user = useAuthStore(state => state.user);

  const [qtyModalOpen, setQtyModalOpen] = React.useState(false);
  const isWishlisted = wishlistItems.includes(product.id);

  let variants = parseList(product.variants);
  if (variants.length === 0) {
    const images = parseList(product.images);
    const sizes = parseList(product.sizes);
    variants = [{
      color: product.color || '',
      images: images.length > 0 ? images : product.image_url ? [product.image_url] : [],
      sizes: sizes.map(size => ({
        ...size,
        mrp: size.mrp || size.price,
        our_price: size.our_price || size.price,
        shopkeeper_price: size.shopkeeper_price || '',
      })),
    }];
  }

  variants = variants.map(variant => ({
    ...variant,
    images: parseList(variant.images),
    sizes: parseList(variant.sizes),
  }));

  let firstVariant = variants[0] || { color: '', images: [], sizes: [] };
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    const matched = variants.find(v => v.code?.toLowerCase().includes(query) || v.color?.toLowerCase().includes(query));
    if (matched) firstVariant = matched;
  }

  // Flatten ALL size options across all variants
  const allSizeOptions = [];
  variants.forEach(variant => {
    (variant.sizes || []).forEach(sz => {
      allSizeOptions.push({ ...sz, _variant: variant });
    });
  });
  if (allSizeOptions.length === 0) {
    allSizeOptions.push({
      size: 'Standard',
      mrp: product.price || 0,
      our_price: product.price || 0,
      shopkeeper_price: '',
      stock: product.stock ?? 0,
      _variant: firstVariant,
    });
  }

  // Selected size state - default to first in-stock size
  const defaultIdx = allSizeOptions.findIndex(s => Number(s.stock) > 0);
  const [selectedIdx, setSelectedIdx] = React.useState(defaultIdx >= 0 ? defaultIdx : 0);
  const selectedSize = allSizeOptions[selectedIdx] || allSizeOptions[0];
  const selectedVariant = selectedSize._variant || firstVariant;

  const firstImg = selectedVariant.images?.[0] || firstVariant.images?.[0] || '';

  // Price for selected size
  const originalPrice = Number(selectedSize.mrp) || Number(selectedSize.our_price) || 0;
  let basePrice = Number(selectedSize.our_price) || originalPrice;
  if (user?.role === 'shopkeeper' && selectedSize.shopkeeper_price) {
    basePrice = Number(selectedSize.shopkeeper_price);
  }
  let displayPrice = basePrice;

  let activeOffer = null;
  if (selectedSize.offer_id) {
    activeOffer = offers?.find(o => o.id == selectedSize.offer_id && o.is_active);
  } else if (product.offer_id) {
    activeOffer = offers?.find(o => o.id === product.offer_id && o.is_active);
  }
  if (activeOffer) {
    displayPrice = Math.round(originalPrice - (originalPrice * (activeOffer.discount_percentage / 100)));
  }

  const isSelectedOutOfStock = Number(selectedSize.stock) <= 0;
  const totalStock = allSizeOptions.reduce((s, sz) => s + (Number(sz.stock) || 0), 0);
  const isOutOfStock = totalStock <= 0;

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const avgRating = reviews.length > 0
    ? (reviews.reduce((t, r) => t + Number(r.rating || 0), 0) / reviews.length).toFixed(1)
    : '4.5';
  const reviewCount = reviews.length || 12;
  const productName = product.name || 'Unnamed product';
  const productUrl = `/product/${product.id}${firstVariant.code ? `?variantCode=${encodeURIComponent(firstVariant.code)}` : ''}`;

  const handleWishlist = e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); };
  const handleShare = async e => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) { try { await navigator.share({ title: productName, url }); } catch {} return; }
    try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch { alert('Unable to copy link.'); }
  };
  const handleInstagram = e => {
    e.preventDefault(); e.stopPropagation();
    const reelUrl = product.instagram_reel_url || firstVariant.instagram_link;
    if (reelUrl) window.open(reelUrl, '_blank', 'noopener,noreferrer');
  };
  const handleSizeClick = (e, idx) => { e.preventDefault(); e.stopPropagation(); setSelectedIdx(idx); };
  const handleAddToCart = async e => {
    e.preventDefault(); e.stopPropagation();
    if (isSelectedOutOfStock) return;
    if (user?.role === 'shopkeeper') { setQtyModalOpen(true); return; }
    await confirmAddToCart(1);
  };
  const confirmAddToCart = async qty => {
    await addToCart(product, { ...selectedSize, price: displayPrice, stock: selectedSize.stock, image: firstImg }, qty, selectedVariant.color);
  };
  const handleCardClick = () => navigate(productUrl);
  const handleCardKeyDown = e => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); }
  };

  const iconButtonClass = 'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-maroon/60 shadow-sm transition-transform hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-gold motion-reduce:transition-none';
  const imageAlt = firstImg ? `${productName} product image` : `${productName} image unavailable`;

  // LIST LAYOUT
  if (layout === 'list') {
    return (
      <div role="link" tabIndex={0} aria-label={`View ${productName}`} onClick={handleCardClick} onKeyDown={handleCardKeyDown}
        className="group relative flex cursor-pointer gap-4 rounded-[24px] border border-brand-gold/25 bg-white p-4 transition-colors hover:border-brand-gold/55 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-gold motion-reduce:transition-none">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[18px] bg-brand-cream/60 p-2">
          {activeOffer && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-brand-green px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {parseFloat(activeOffer.discount_percentage)}% off
            </span>
          )}
          {firstImg ? (
            <img src={firstImg} alt={imageAlt} className="h-full w-full object-contain mix-blend-multiply" decoding="async" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-center text-xs text-brand-maroon/60">No image</div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center pr-20">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-brand-dark-blue md:text-base">{productName}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-brand-maroon/65">
            <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
            <span>{avgRating} ({reviewCount})</span>
          </div>
          {/* Size chips in list view */}
          {allSizeOptions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
              {allSizeOptions.map((sz, i) => {
                const outSz = Number(sz.stock) <= 0;
                const sel = i === selectedIdx;
                return (
                  <button key={i} type="button" onClick={e => handleSizeClick(e, i)} disabled={outSz}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold border transition-all ${
                      sel ? 'bg-brand-green text-white border-brand-green' :
                      outSz ? 'bg-gray-50 text-gray-300 border-gray-200 line-through cursor-not-allowed' :
                      'bg-gray-100 text-gray-700 border-gray-200 hover:border-brand-green/60'}`}>
                    {sz.size}
                  </button>
                );
              })}
            </div>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-brand-dark-blue">₹{displayPrice}</span>
            {(activeOffer || originalPrice > displayPrice) && (
              <span className="text-xs text-brand-maroon/55 line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>
        <div className="absolute right-3 top-3 flex gap-1">
          <button type="button" aria-label={isWishlisted ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`} title="Wishlist" onClick={handleWishlist} className={iconButtonClass}>
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-brand-green text-brand-green' : ''}`} />
          </button>
          <button type="button" aria-label={`Share ${productName}`} title="Share product" onClick={handleShare} className={iconButtonClass}>
            <Share2 className="h-4 w-4" />
          </button>
          {(product.instagram_reel_url || firstVariant.instagram_link) && (
            <button type="button" aria-label={`Watch ${productName} on Instagram`} title="Watch Instagram Reel" onClick={handleInstagram} className={`${iconButtonClass} text-[#E1306C]`}>
              <InstagramIcon className="h-4 w-4 text-[#E1306C]" />
            </button>
          )}
        </div>
        {isSelectedOutOfStock ? (
          <span className="absolute bottom-4 right-4 rounded-full border border-brand-green/20 bg-red-50 px-3 py-1.5 text-xs font-semibold text-brand-green">Out of stock</span>
        ) : (
          <button type="button" aria-label={`Add ${productName} to cart`} title="Add to cart" onClick={handleAddToCart}
            className="absolute bottom-3 right-3 flex h-9 px-4 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#073020] to-[#15803d] text-[13px] font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95">
            <ShoppingCart className="h-4 w-4" /><span>Add</span>
          </button>
        )}
        <QuantityModal isOpen={qtyModalOpen} onClose={() => setQtyModalOpen(false)} onConfirm={confirmAddToCart} productName={productName} />
      </div>
    );
  }

  // GRID LAYOUT
  return (
    <article role="link" tabIndex={0} aria-label={`View ${productName}`} onClick={handleCardClick} onKeyDown={handleCardKeyDown}
      className="group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-brand-gold/25 bg-white p-2.5 transition-colors hover:border-brand-gold/55 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-gold motion-reduce:transition-none sm:p-3">

      {/* Action buttons */}
      <div className="absolute right-3 top-3 z-20 flex gap-1">
        <button type="button" aria-label={isWishlisted ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`} title="Wishlist" onClick={handleWishlist} className={iconButtonClass}>
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-brand-green text-brand-green' : ''}`} />
        </button>
        <button type="button" aria-label={`Share ${productName}`} title="Share" onClick={handleShare} className={iconButtonClass}>
          <Share2 className="h-4 w-4" />
        </button>
        {(product.instagram_reel_url || firstVariant.instagram_link) && (
          <button type="button" aria-label={`Watch ${productName} on Instagram`} title="Watch Reel" onClick={handleInstagram} className={`${iconButtonClass} text-[#E1306C]`}>
            <InstagramIcon className="h-4 w-4 text-[#E1306C]" />
          </button>
        )}
      </div>

      {/* Image */}
      <div className="relative -mx-2.5 -mt-2.5 mb-3 sm:-mx-3 sm:-mt-3 aspect-square overflow-hidden rounded-t-[23px] bg-[#FDF7E5]">
        {activeOffer && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-brand-green px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {parseFloat(activeOffer.discount_percentage)}% OFF
          </span>
        )}
        {firstImg ? (
          <img src={firstImg} alt={imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" decoding="async" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-xs text-brand-maroon/60">No image available</div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        {/* Name */}
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-brand-dark-blue sm:text-sm">{productName}</h3>
        {/* Rating */}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-brand-maroon/65">
          <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
          <span>{avgRating} ({reviewCount})</span>
          {firstVariant.color && <span className="truncate">· {firstVariant.color}</span>}
        </div>

        {/* ── ALL size / quantity chips ── */}
        <div className="mt-2.5 flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
          {allSizeOptions.map((sz, i) => {
            const outSz = Number(sz.stock) <= 0;
            const sel = i === selectedIdx;
            return (
              <button key={i} type="button" id={`size-chip-${product.id}-${i}`}
                onClick={e => handleSizeClick(e, i)} disabled={outSz} title={outSz ? 'Out of stock' : sz.size}
                className={`relative rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wide border transition-all select-none ${
                  sel
                    ? 'bg-brand-green text-white border-brand-green shadow-sm scale-[1.05]'
                    : outSz
                    ? 'bg-gray-50 text-gray-300 border-gray-200 line-through cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-brand-green/60 hover:bg-brand-green/5 hover:text-brand-green'}`}>
                {sz.size}
                {outSz && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 border border-white" />}
              </button>
            );
          })}
        </div>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-lg font-bold leading-none text-brand-dark-blue">₹{displayPrice}</span>
          {(activeOffer || originalPrice > displayPrice) && (
            <>
              <span className="text-[11px] text-gray-400 line-through">₹{originalPrice}</span>
              {activeOffer && <span className="text-[9px] font-bold text-[#073020]">{parseFloat(activeOffer.discount_percentage)}% OFF</span>}
            </>
          )}
        </div>

        {/* Low stock warning */}
        {!isOutOfStock && Number(selectedSize.stock) > 0 && Number(selectedSize.stock) <= 5 && (
          <p className="mt-0.5 text-[10px] font-semibold text-orange-500">Only {selectedSize.stock} left!</p>
        )}

        {/* Add to Cart */}
        <div className="mt-auto pt-3">
          {isSelectedOutOfStock ? (
            <span className="w-full flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-semibold text-gray-400">
              Out of Stock
            </span>
          ) : (
            <button type="button" id={`add-to-cart-${product.id}`}
              aria-label={`Add ${productName} (${selectedSize.size}) to cart`} title="Add to cart"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#073020] to-[#15803d] py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95">
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      <QuantityModal isOpen={qtyModalOpen} onClose={() => setQtyModalOpen(false)} onConfirm={confirmAddToCart} productName={productName} />
    </article>
  );
}
