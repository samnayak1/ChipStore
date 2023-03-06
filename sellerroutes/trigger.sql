CREATE OR REPLACE FUNCTION calculate_price_after_discount() RETURNS TRIGGER AS $$
BEGIN
  NEW.priceafterdiscount := NEW.price - (NEW.price * (NEW.discount / 100));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER calculate_price_after_discount_trigger
BEFORE INSERT OR UPDATE ON producttable
FOR EACH ROW
EXECUTE FUNCTION calculate_price_after_discount();