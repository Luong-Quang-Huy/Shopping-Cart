import {FaTrash} from 'react-icons/fa';

type ProductProps = {
    id: number;
    quantity: number;
    photoSrc: string;
    name: string;
    size: string;
    color: string;
    price: number;
    discount: number;
    handleQuantityChange: (id: number, quantity: number) => void;
    handleDeleteProduct: (id: number) => void;
}


export default function ProductDataRow({id, quantity, photoSrc, name, size, color, price, discount, handleQuantityChange, handleDeleteProduct}:ProductProps){
    const subtotal:number = (price - price * discount) * quantity;
    const discountInMoney:number = price * discount * quantity;
    return (
      <tr className="text-center border-y">
        <td>
          <div className="sm:flex items-center text-left">
            <div className="w-0 h-0 md:shrink-0 sm:w-[110px] sm:h-[90px] ml-3 text-center relative">
              <img src={photoSrc} alt={name} className='w-full h-full'/>
              {(discount != 0) && <p className='invisible sm:visible text-center px-1 absolute bottom-0 right-0 bg-orange-300'><span className='text-red-600'>{`-${discount * 100}%`}</span></p>}
            </div>
            <div className="ml-5 text-gray-800 text-xs">
              <p className="mb-2 font-medium text-base">{name}</p>
              <p>
                <span className="font-medium">Size:</span>
                {size}
              </p>
              <p>
                <span className="font-medium">Color:</span>
                {color}
              </p>
              <p>
                <span className="font-medium">Price: </span>
                <span className="text-sm text-green-500">{`${price}$`}</span>
              </p>
            </div>
          </div>
        </td>
        <td>
          <select
            className="w-[86px] h-11 py-1 px-3 focus:border-0 focus:ring-4 focus:ring-teal-200 focus:rounded focus-visible:outline-none"
            value={quantity}
            onChange={(e) => {
              handleQuantityChange(id, Number(e.target.value));
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td>
          <p>{`${subtotal.toFixed(2)}$`}</p>
        </td>
        <td>
          <p className="text-red-500">
            {discountInMoney != 0 ? `- ${discountInMoney.toFixed(2)}$` : "_"}
          </p>
        </td>
        <td>
          <button
            onClick={() => {
              handleDeleteProduct(id);
            }}
            className="text-red-500 hover:text-red-400"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    );
}