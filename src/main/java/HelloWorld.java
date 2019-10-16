

import org.xml.sax.SAXException;



import javax.xml.parsers.ParserConfigurationException;

import javax.xml.transform.TransformerException;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import java.nio.charset.StandardCharsets;

import static spark.Spark.*;
public class HelloWorld {
    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException, TransformerException {
        //BasicConfigurator.configure();
        //URLConnection con = new URL("https://www.lb.lt/lt/currency/daylyexport/?xml=1&class=Eu&type=day&date_day=2019-10-16").openConnection();
        //System.out.println(con);
        //get("/hello", (req, res) -> "Hello World " + req.queryParams("foo"));

        String urlString = "";
        URL u = new URL("http://www.lb.lt/lt/currency/daylyexport/?xml=1&class=Eu&type=day&date_day=2019-10-16");
        try (InputStream in = u.openStream()) {
             String a = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            System.out.println(a);
        }


// that’s the default xform; use a stylesheet to get a real one

    }
}
