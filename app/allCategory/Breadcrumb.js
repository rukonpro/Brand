import Link from 'next/link';


const Breadcrumb = ({ categories }) => {


    const renderBreadcrumb = (categoryTree) => {
        return categoryTree?.map((category, index) => (
            <span key={index}>
        <Link href={`/${category?.id}`}>
          {category?.name}
        </Link>
                {category?.children && category?.children?.length > 0 && (
                    <>
                        {" > "}
                        {renderBreadcrumb(category?.children)}
                    </>
                )}
      </span>
        ));
    };

    return (
        <div className="breadcrumb">
            {renderBreadcrumb(categories)}
        </div>
    );
};

export default Breadcrumb;
