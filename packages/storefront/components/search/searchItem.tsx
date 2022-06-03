import Link from "next/link";

const SearchItem = () => {
	return (
		<>
			<div className="lg:w-2/5 mx-auto my-8 flex flex-wrap items-center justify-center">
				<div className="md:w-1/4">
					<Link href="/product/1">

					<img
						alt="ecommerce"
						className="h-auto w-auto hover:cursor-pointer"
						src="https://cdn.shopify.com/s/files/1/0359/6350/2651/products/productbig9_ef67d26b-f717-4bf3-82ec-5eae9aad5a11_1024x1024.jpg?v=1587984831"
					/>
					</Link>

				</div>
				<div className="md:w-3/4 pl-3">
					<Link href="/product/1">
					<h2 className="text-gray-900 text-xl title-font font-normal mb-1 hover:cursor-pointer">
						<strong className="highlight">Demo</strong> product
						title{" "}
					</h2>
					</Link>
					<div className="flex">
						<span className="text-gray-900 mb-1 mt-2 text-sm">
							$58.00
						</span>
					</div>
					<p className="text-gray-900 text-sm mb-1 mt-2">
						Fam locavore kickstarter distillery. Mixtape chillwave
						tumeric sriracha taximy chia microdosing tilde DIY. XOXO
						fam indxgo juiceramps cornhole raw denim forage
						brooklyn. Everyday carry +1 seitan poutine tumeric.
					</p>

					<div></div>
				</div>
			</div>
		</>
	);
};

export default SearchItem;
