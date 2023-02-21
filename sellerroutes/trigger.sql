CREATE OR REPLACE FUNCTION price_after_discount()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	 UPDATE producttable
     SET producttable.priceafterdiscount=(producttable.price-(producttable.discount/100)*producttable.price);

	RETURN NEW;
END;
$$

CREATE TRIGGER price_discount_changes
  AFTER UPDATE
  ON producttable
  FOR EACH ROW
  EXECUTE PROCEDURE price_after_discount();